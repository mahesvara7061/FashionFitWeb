import os
from flask import Flask, render_template, request, jsonify, send_file
import replicate
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Initialize Replicate client
replicate_client = replicate.Client(api_token=os.environ.get("REPLICATE_API_TOKEN"))

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            # Get uploaded files and form data
            garm_img = request.files["garm_img"]
            human_img = request.files["human_img"]
            garment_des = request.form["garment_des"]

            # Save uploaded files temporarily
            garm_img.save("garm_img.jpg")
            human_img.save("human_img.jpg")

            # Prepare input for API
            input_data = {
                "garm_img": open("garm_img.jpg", "rb"),
                "human_img": open("human_img.jpg", "rb"),
                "garment_des": garment_des,
            }

            # Call Replicate API
            output = replicate.run(
                "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
                input=input_data,
            )

            # Save the output image to a file
            output_file = "output.jpg"
            with open(output_file, "wb") as file:
                file.write(output.read())

            # Return the file path as the response
            return jsonify({"output": "/output.jpg"})

        except Exception as e:
            return jsonify({"error": str(e)}), 400

    return render_template("index.html")

@app.route("/output.jpg")
def serve_output():
    return send_file("output.jpg", mimetype="image/jpeg")

if __name__ == "__main__":
    app.run(debug=True)
