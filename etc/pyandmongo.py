from pyspark import SparkContext, SparkConf

import pymongo_spark
# Important: activate pymongo_spark.
pymongo_spark.activate()


def main():
    conf = SparkConf().setAppName("pyspark test")
    sc = SparkContext(conf=conf)

    # Create an RDD backed by the MongoDB collection.
    # This RDD *does not* contain key/value pairs, just documents.
    # If you want key/value pairs, use the mongoPairRDD method instead.
    rdd = sc.mongoRDD('mongodb://localhost:27017/db.contextizer')

if __name__ == '__main__':
    main()
