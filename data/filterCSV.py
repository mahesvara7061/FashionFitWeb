import pandas as pd

# Đường dẫn đến tệp CSV gốc
csv_file = 'product_data.csv'  # Thay thế bằng tên tệp CSV của bạn

# Đọc dữ liệu từ CSV
try:
    df = pd.read_csv(csv_file)
    print("Đã tải tệp CSV thành công.")
except Exception as e:
    print(f"Lỗi khi đọc tệp CSV: {e}")
    exit(1)

# Các cột yêu cầu
required_columns = [
    'ProductId', 'Gender', 'Category', 'SubCategory',
    'ProductType', 'Colour', 'Usage', 'ProductTitle', 'ImageURL'
]

# Kiểm tra các cột cần thiết
missing_columns = [col for col in required_columns if col not in df.columns]
if missing_columns:
    print(f"Các cột thiếu trong CSV: {missing_columns}")
    exit(1)

# Lọc dữ liệu cho từng giới tính
# Giả sử giá trị trong cột 'Gender' là 'Boys' và 'Girls' (có phân biệt chữ hoa chữ thường)
boys_df = df[df['Gender'].str.lower() == 'boys']
girls_df = df[df['Gender'].str.lower() == 'girls']

# Kiểm tra số lượng sản phẩm cho mỗi giới tính
num_boys = len(boys_df)
num_girls = len(girls_df)

print(f"Số lượng sản phẩm Boys hiện có: {num_boys}")
print(f"Số lượng sản phẩm Girls hiện có: {num_girls}")

# Xác định số lượng cần lấy (tối đa là 200 hoặc số lượng có sẵn nếu ít hơn)
num_boys_sample = min(200, num_boys)
num_girls_sample = min(200, num_girls)

# Lấy ngẫu nhiên 200 sản phẩm cho mỗi giới tính
boys_sample = boys_df.sample(n=num_boys_sample, random_state=42)  # random_state để tái tạo kết quả
girls_sample = girls_df.sample(n=num_girls_sample, random_state=42)

print(f"Lấy {num_boys_sample} sản phẩm Boys và {num_girls_sample} sản phẩm Girls.")

# Gộp lại thành DataFrame mới
filtered_df = pd.concat([boys_sample, girls_sample], ignore_index=True)

# Kiểm tra số lượng cuối cùng
print(f"Tổng số sản phẩm sau khi lọc: {len(filtered_df)}")

# Đường dẫn đến tệp CSV mới
output_csv = 'filtered_product_data.csv'  # Bạn có thể thay đổi tên tệp theo ý muốn

# Lưu DataFrame đã lọc vào CSV mới
try:
    filtered_df.to_csv(output_csv, index=False)
    print(f"Dữ liệu đã được lưu vào tệp {output_csv}")
except Exception as e:
    print(f"Lỗi khi lưu tệp CSV: {e}")
