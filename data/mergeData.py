import pandas as pd
import json

# Đọc tệp CSV
csv_file_path = '/home/s48gb/Desktop/GenAI4E/insdet/WorkOfDat/FashionFit/filtered_product_data.csv'
df_csv = pd.read_csv(csv_file_path)

# Đọc tệp JSON Lines
json_file_path = '/home/s48gb/Desktop/GenAI4E/insdet/WorkOfDat/FashionFit/product_data.json'
json_data = []

# Đọc từng dòng của JSON Lines và thêm vào danh sách
with open(json_file_path, 'r') as f:
    for line in f:
        line = line.strip()  # Loại bỏ khoảng trắng hoặc dòng trống
        if line:  # Chỉ xử lý nếu dòng không trống
            try:
                json_data.append(json.loads(line))
            except json.JSONDecodeError:
                print(f"Warning: Lỗi JSON ở dòng {line} - dòng này sẽ bị bỏ qua.")

# Chuyển đổi danh sách JSON Lines thành DataFrame
df_json = pd.DataFrame(json_data)

# Gộp hai DataFrame lại dựa trên ProductId
merged_df = pd.merge(df_csv, df_json, on='ProductId', how='left')

# Chuyển đổi DataFrame hợp nhất thành định dạng JSON
result_json = merged_df.to_dict(orient='records')

# Xuất ra tệp JSON hoặc in kết quả
output_json_path = 'Kids_Fashion_Data.json'
with open(output_json_path, 'w', encoding='utf-8') as f:
    json.dump(result_json, f, ensure_ascii=False, indent=4)

# In kết quả ra màn hình
print(json.dumps(result_json, ensure_ascii=False, indent=4))
