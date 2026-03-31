from flask import Flask, request, jsonify
from flask_cors import CORS
from pandas import DataFrame
from typing import List, Optional, Union
import os
from openai import OpenAI

app = Flask(__name__)
CORS(app)
client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="http://api.deepseek.com"
)
def type_check(df: DataFrame, columns: Optional[List[str]] = None) -> Union[DataFrame, bool]:
    """Checks if the specified columns in the DataFrame are of the type 'object' (string).
    """ 
    if columns is None:
        columns = df.columns.tolist()
    for column in columns:
        if column not in df.columns:
            raise ValueError(f"Column '{column}' not found in DataFrame")
        if df[column].dtype != 'object':
            return False

    return df[columns]

@app.route('/api/analyze-game' , methods=['POST'])
def analyze_game():
    |"""Endpoint to analyze a game based on the provided DataFrame and columns"""
    try:
        # Get game data from requst
        game_data = request.json()