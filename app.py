from flask import Flask, render_template, request, redirect, url_for
import os

# Initialize Flask app
app = Flask(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Route for the upload page
@app.route('/')
def upload_page():
    return render_template('upload.html')

# Route to handle file upload
@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return "No file part", 400
    file = request.files['video']
    if file.filename == '':
        return "No selected file", 400
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        return redirect(url_for('playback_page', filename=file.filename))

# Route for the playback page
@app.route('/playback/<filename>')
def playback_page(filename):
    video_url = url_for('static', filename=f'uploads/{filename}')
    return render_template('playback.html', video_url=video_url)

if __name__ == '__main__':
    app.run(debug=True)
