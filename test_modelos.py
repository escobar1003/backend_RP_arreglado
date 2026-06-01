import google.generativeai as genai

genai.configure(api_key="AQ.Ab8RN6J6PGMcupOQvGX1JCsem1A6BW2aJ1T2OSTrsHejR4YVqw")

for model in genai.list_models():
    print(model.name)