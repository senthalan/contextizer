from pymongo import MongoClient


client = MongoClient('localhost', 27111)

newsDB = client.contextizer.news
newsWithTagDB = client.contextizer.news_with_tag

results = newsDB.find()

print()
print('+-+-+-+-+-+-+-+-+-+-+-+-+-+-')

# display documents from collection
for record in results:
	# print out the document
	newsWithTagDB.insert({"mediaId":record["mediaId"],"description":record["description"],"text":record["text"],"link":record["link"],"tags":["test","test1",'test3']})

client.close()
