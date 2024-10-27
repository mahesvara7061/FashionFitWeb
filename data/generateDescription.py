import torch
from PIL import Image
from transformers import AutoModelForCausalLM
import pandas as pd
import requests
from io import BytesIO
import base64
import time
from tqdm import tqdm

# Tải mô hình và tokenizer
# Đường dẫn đến file CSV
csv_file = 'filtered_product_data.csv'  # Thay thế bằng tên file CSV của bạn

# Đọc dữ liệu từ CSV
try:
    df = pd.read_csv(csv_file)
    print("CSV file loaded successfully.")
except Exception as e:
    print(f"Error reading CSV file: {e}")
    exit(1)

# Kiểm tra các cột cần thiết
required_columns = ['ProductId', 'Gender', 'Category', 'SubCategory', 'ProductType', 'Colour', 'Usage', 'ProductTitle', 'ImageURL']
missing_columns = [col for col in required_columns if col not in df.columns]
if missing_columns:
    print(f"Missing columns in CSV: {missing_columns}")
    exit(1)

# Tạo danh sách để lưu kết quả
results = []
model_name = "AIDC-AI/Ovis1.6-Gemma2-9B"
model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
        multimodal_max_length=8192,
        trust_remote_code=True
    ).cuda()

text_tokenizer = model.get_text_tokenizer()

    # Tải xử lý hình ảnh
visual_tokenizer = model.get_visual_tokenizer()
    

# Duyệt qua từng sản phẩm trong CSV

for index, row in tqdm(df.iterrows(), desc="Processing products", total=len(df)):
    model_name = "AIDC-AI/Ovis1.6-Gemma2-9B"

    try:
    
    # Tải mô hình
        model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
        multimodal_max_length=8192,
        trust_remote_code=True
    ).cuda()

    except Exception as e:
        print(f"Error loading model: {e}")
        exit(1)
    try:
        # Lấy thông tin sản phẩm
        product_id = row['ProductId']
        gender = row['Gender']
        category = row['Category']
        sub_category = row['SubCategory']
        product_type = row['ProductType']
        colour = row['Colour']
        usage = row['Usage']
        product_title = row['ProductTitle']
        image_url = row['ImageURL']

        # Tạo metadata
        metadata = f"{gender}, {category}, {sub_category}, {product_type}, {colour}, {usage}, {product_title}"

        # Tạo prompt tiếng Anh với cấu trúc mong muốn
        prompt = f"""Use the image and metadata to create a detailed description for my kids' fashion product. The response should include:
1. A paragraph describing the product in detail.
2. A list of its key features.

Metadata: {metadata}
"""

        # Tải hình ảnh từ URL
        response = requests.get(image_url)
        if response.status_code == 200:
            image = Image.open(BytesIO(response.content)).convert('RGB')
        else:
            print(f"Cannot load image for ProductId {product_id}. Skipping.")
            continue

        # xử lý văn bản
        text = prompt
        query = f"<image>\n{text}"

        prompt, input_ids, pixel_values = model.preprocess_inputs(query, [image])
        attention_mask = torch.ne(input_ids, text_tokenizer.pad_token_id)
        input_ids = input_ids.unsqueeze(0).to(device=model.device)
        attention_mask = attention_mask.unsqueeze(0).to(device=model.device)
        pixel_values = [pixel_values.to(dtype=visual_tokenizer.dtype, device=visual_tokenizer.device)]

# generate output
        with torch.inference_mode():
            gen_kwargs = dict(
        max_new_tokens=1024,
        do_sample=False,
        top_p=None,
        top_k=None,
        temperature=None,
        repetition_penalty=None,
        eos_token_id=model.generation_config.eos_token_id,
        pad_token_id=text_tokenizer.pad_token_id,
        use_cache=True
    )
            output_ids = model.generate(input_ids, pixel_values=pixel_values, attention_mask=attention_mask, **gen_kwargs)[0]
            generated_text = text_tokenizer.decode(output_ids, skip_special_tokens=True)

    

        # Lưu kết quả
        results.append({
            'ProductId': product_id,
            'Description_Paragraph': generated_text # Lưu danh sách tính năng dưới dạng chuỗi, phân cách bằng dấu chấm phẩy
        })

        # In kết quả cho từng sản phẩm
        print(f"ProductId: {product_id}")
        print("Paragraph:")
        print(generated_text)

    except Exception as e:
        print(f"Error processing ProductId {product_id}: {e}")
        continue

# Chuyển kết quả thành DataFrame
json_file = 'product_data.json'
df_results = pd.DataFrame(results)

# Lưu kết quả vào file JSON
df_results.to_json(json_file, orient='records', lines=True)
print(f"Results saved to {json_file}.")

