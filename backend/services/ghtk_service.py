from flask import Blueprint, request, jsonify
from datetime import datetime
import hashlib
import requests

# Tạo Blueprint cho GHTK
ghtk_bp = Blueprint("ghtk", __name__)

# Thông tin xác thực API
BASE_URL = "https://services.giaohangtietkiem.vn"
API_TOKEN = "IDlMNSes2cRE43PckpfXqvZ9PeQJAHlnjkgoki"
PARTNER_CODE = "S22801838"

# Secret Key (cần được cung cấp bởi GHTK để kiểm tra hash)
GHTK_SECRET = "S22801838"

# Hàm để tính phí đơn hàng
def calculate_shipping_fee(order_data):
    url = f'{BASE_URL}/services/shipment/fee'
    headers = {
        'Token': API_TOKEN,
        'X-Client-Source': PARTNER_CODE,
        'Content-Type': 'application/json'
    }

    response = requests.post(url, json=order_data, headers=headers)
    return response.json()

# Hàm để lấy trạng thái đơn hàng
def get_order_status(tracking_order):
    url = f'{BASE_URL}/services/shipment/v2/{tracking_order}'
    headers = {
        'Token': API_TOKEN,
        'X-Client-Source': PARTNER_CODE,
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)
    return response.json()

# Hàm để tạo đơn hàng
def create_order(order_data):
    url = f'{BASE_URL}/services/shipment/order'
    headers = {
        'Token': API_TOKEN,
        'X-Client-Source': PARTNER_CODE,
        'Content-Type': 'application/json'
    }
    response = requests.post(url, json=order_data, headers=headers)
    return response.json()

# Hàm để hủy đơn hàng
def cancel_order(order_label):
    url = f'{BASE_URL}/services/shipment/cancel/{order_label}'
    headers = {
        'Token': API_TOKEN,
        'X-Client-Source': PARTNER_CODE,
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers)
    return response.json()

# order_data = {
#     "products": [{
#         "weight": float(0.2),
#     }],
#     "order": {
#         "id": "123fneif34ij430r3k0fm3icn", # order_id
#         "pick_name": "FashionFit",
#         "pick_address": "227 Nguyễn Văn Cừ",
#         "pick_province": "TP. Hồ Chí Minh",
#         "pick_district": "Quận 5",
#         "pick_ward": "Phường 4",
#         "pick_street": "Nguyen Van Cu",
#         "pick_tel": "0911122233",
#         "name": "huynh Dat",
#         "address": "683 Au Co",
#         "province": "TP. Hồ Chí Minh",
#         "district": "Quận Tân Bình",
#         "ward": "Phường 14",
#         "tel": "0911122433",
#         "email": "htdat29021@gmail.com",
#         "hamlet": "Khác",
#         "pick_money": 0,
#         "value": 3000000,
#         "booking_id": "1234"
#     }
# }

# res = create_order(order_data)
# print(res)

# oid = "S22801838.SGP79-N29.1361431066"
# res = cancel_order(oid)
# print(res)