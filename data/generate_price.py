import json
import requests
from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from collections import deque
from tqdm import tqdm

# Đường dẫn tệp JSON
input_file_path = "Kids_Fashion_Data.json"
output_file_path = "Kids_Fashion_Data_with_Prices.json"

# Hàm sử dụng Selenium để xử lý Captcha hoặc truy cập khi bị chặn
def fetch_with_selenium(url):
    driver = webdriver.Chrome()  # Cần cài đặt ChromeDriver hoặc GeckoDriver
    driver.get(url)
    time.sleep(5)  # Chờ trang tải xong (điều chỉnh thời gian nếu cần)
    html = driver.page_source
    driver.quit()
    return html

# Hàm lấy giá sản phẩm đầu tiên từ Amazon
def get_first_product_amazon(product_name):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:114.0) Gecko/20100101 Firefox/114.0",
    }
    search_url = f"https://www.amazon.com/s?k={'+'.join(product_name.split())}"
    try:
        response = requests.get(search_url, headers=headers, timeout=10)
        if response.status_code == 503:
            print("Bị chặn, sử dụng Selenium...")
            html = fetch_with_selenium(search_url)
        else:
            html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        results = soup.select('.s-result-item')
        for item in results:
            title_element = item.select_one('h2 .a-link-normal')
            price_element = item.select_one('.a-price .a-offscreen')
            if title_element and price_element:
                price_text = price_element.text.strip().replace('$', '').replace(',', '')
                try:
                    price = float(price_text)
                except ValueError:
                    continue
                return price
        return None
    except requests.exceptions.RequestException as e:
        print(f"Lỗi khi truy cập Amazon: {e}")
        return None

# Hàm lấy tỷ giá USD/VND hiện tại
def get_usd_to_vnd_exchange_rate():
    try:
        response = requests.get("https://www.xe.com/currencyconverter/convert/?Amount=1&From=USD&To=VND")
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            rate_element = soup.find("span", class_="converterresult-toAmount")
            if rate_element:
                return float(rate_element.text.replace(',', ''))
        return 24000  # Tỷ giá mặc định
    except Exception as e:
        print(f"Lỗi khi lấy tỷ giá: {e}")
        return 24000

# Tính giá trung bình từ stack
def interpolate_price_vnd(stack):
    if not stack:
        return 0  # Không có giá trước đó
    return round(sum(stack) / len(stack), 0)

# Đọc dữ liệu từ tệp JSON
with open(input_file_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

# Lấy tỷ giá USD/VND
exchange_rate = get_usd_to_vnd_exchange_rate()

# Stack lưu giá của 5 sản phẩm gần nhất
price_stack = deque(maxlen=5)

# Cập nhật thông tin sản phẩm
for product in tqdm(products, desc="Đang tìm giá..."):
    product_name = product.get("ProductTitle", "")
    print(f"Tìm giá cho sản phẩm: {product_name}")
    price_usd = get_first_product_amazon(product_name)
    if price_usd:
        price_vnd = price_usd * exchange_rate
        product["PriceUSD"] = price_usd
        product["PriceVND"] = round(price_vnd, 0)
        price_stack.append(product["PriceVND"])  # Thêm giá vào stack
        print(f" - Giá USD: ${price_usd}")
        print(f" - Giá VND: {round(price_vnd, 0)} VND")
    else:
        # Sử dụng nội suy nếu không tìm thấy giá
        interpolated_price = interpolate_price_vnd(price_stack)
        product["PriceUSD"] = None
        product["PriceVND"] = interpolated_price
        print(" - Không tìm thấy giá, sử dụng nội suy:")
        print(f" - Giá VND nội suy: {interpolated_price} VND")

# Ghi dữ liệu vào tệp JSON mới
with open(output_file_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=4)

print(f"Dữ liệu đã được lưu vào '{output_file_path}'.")
