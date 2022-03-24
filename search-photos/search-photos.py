import json
import boto3
import requests

def lambda_handler(event, context):
    print("Event:*****")
    print(event)
    print("context:******")
    print(context)
    Res = []
    bot = boto3.client('lex-runtime')

    search_text = event["queryStringParameters"]["q"]

    response = bot.post_text(
        botName = 'searchBot',
        botAlias = 'search',
        userId = '11',
        inputText = search_text)
    print(response)
    keys = []
    slots = response['slots']
    for i, tag in slots.items():
        if tag:
            print("Tag: ", tag)
            keys.append(tag)

    photo_set = set()
    ImageUrls = []
    for i in range(len(keys)):
        key = keys[i]
        url = 'https://search-photos-fi7ljgnh6t7jenzl52sf6tmheu.us-east-1.es.amazonaws.com/photos/_search?q=' + key
        response = requests.get(url,auth=("yxyxy", "Aabc2017!"))
        response = json.loads(response.content.decode('utf-8'))

        for each in response['hits']['hits']:
            bucket, image = each['_source']['bucket'], each['_source']['objectKey']
            image_url = "https://s3.amazonaws.com/" + bucket + "/" + image
            if image_url not in photo_set:
                photo_set.add(image_url)
                ImageUrls.append(image_url)
    if ImageUrls:
        return{
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application.json'
            },
            'body': json.dumps(ImageUrls)
        }
    else:
        return{
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application.json'
            },
            'body': json.dumps("No photo found.")
        }
