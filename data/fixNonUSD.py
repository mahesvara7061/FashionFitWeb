import json
import requests
from bs4 import BeautifulSoup

# Đường dẫn tệp JSON
input_file_path = "Kids_Fashion_Data_with_Prices.json"
output_file_path = "Kids_Fashion_Data_Final.json"

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

# Lấy tỷ giá USD/VND hiện tại
exchange_rate = get_usd_to_vnd_exchange_rate()

# Đọc tệp JSON đầu vào
try:
    with open(input_file_path, 'r', encoding='utf-8') as f:
        products = json.load(f)
except FileNotFoundError:
    print(f"Không tìm thấy tệp: {input_file_path}")
    products = []

# Cập nhật các sản phẩm với PriceUSD = null
for product in products:
    if product.get("PriceUSD") is None and product.get("PriceVND") is not None:
        price_vnd = product["PriceVND"]
        price_usd = price_vnd / exchange_rate
        product["PriceUSD"] = round(price_usd, 2)  # Cập nhật giá USD
        print(f"Đã cập nhật: {product['ProductTitle']} - PriceUSD: {product['PriceUSD']} USD")

# Lưu lại tệp JSON đã cập nhật
try:
    with open(output_file_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=4)
    print(f"Dữ liệu đã được lưu vào '{output_file_path}'.")
except Exception as e:
    print(f"Lỗi khi ghi tệp JSON: {e}")
