import pandas as pd
import random
from datetime import datetime, timedelta
import json

# Read product data from JSON file
with open('Kids_Fashion_Data.json', 'r') as file:
    products_data = json.load(file)

# Define possible sizes for each product type
size_mapping = {
    "Tshirts": ["XS", "S", "M", "L", "XL"],
    "Shoes": ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    "Pants": ["XS", "S", "M", "L", "XL", "XXL"],
    "Dresses": ["XS", "S", "M", "L", "XL"],
    "Accessories": []  # No size applicable
}

products = []
start_date = datetime(2024, 10, 1, 8, 0)  # Start date for the first product
end_date = datetime.today()  # End date is today

# Calculate daily product creation range
min_products_per_day = 6
max_products_per_day = 8
current_time = start_date


def generate_sizes(product_type):
    sizes = size_mapping.get(product_type, [])
    if not sizes:
        sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    start_idx = random.randint(0, len(sizes) - 3)
    end_idx = random.randint(start_idx + 2, len(sizes) - 1)
    return sizes[start_idx:end_idx + 1]

for idx, product in enumerate(products_data, start=1):
    product_id = f"{idx:03d}"  # Format ProductId as 3-digit number

    # Randomly assign a time within a small interval, ensuring non-decreasing timestamps
    random_offset_minutes = random.randint(0, 30)  # Random offset in minutes
    next_time = current_time + timedelta(minutes=random_offset_minutes)

    # Ensure next_time does not exceed end_date
    if next_time > end_date:
        next_time = end_date

    created_time = next_time
    updated_time = created_time  # Same as created_time

    sales = random.randint(0, 1000)  # Random sales value
    stock = random.randint(0, 200)  # Random stock value
    sizes = generate_sizes(product.get("ProductType", "Unknown"))

    products.append({
        "ProductId": product_id,
        "ProductTitle": product.get("ProductTitle", "Unknown"),
        "Category": product.get("Category", "Unknown"),
        "SubCategory": product.get("SubCategory", "Unknown"),
        "ProductType": product.get("ProductType", "Unknown"),
        "Gender": product.get("Gender", "Unknown"),
        "Colour": product.get("Colour", "Unknown"),
        "Usage": product.get("Usage", "Unknown"),
        "Sizes": sizes,
        "PriceUSD": product.get("PriceUSD", 0.0),
        "PriceVND": product.get("PriceVND", 0.0),
        "Stock": stock,
        "Sales": sales,
        "Image": product.get("Image", f"{product_id}.jpg"),
        "ImageURL": product.get("ImageURL"),  # Keep original URL
        "CreatedTime": created_time.isoformat(),
        "UpdatedTime": updated_time.isoformat(),
        "Description_Paragraph": product.get("Description_Paragraph", "No description available.")
    })

    # Advance the current_time for the next product
    current_time = created_time

    # Reset to the start of the next day if the daily product limit is reached
    if idx % random.randint(min_products_per_day, max_products_per_day) == 0:
        current_time = current_time.replace(hour=8, minute=0, second=0) + timedelta(days=1)

# Save updated products to JSON file
with open("updated_products.json", "w") as outfile:
    json.dump(products, outfile, indent=4)

print("Product data updated and saved to updated_products.json.")
