import * as sst from "@serverless-stack/resources";

//Create db stack- dynamo db and S3 bucket
export default class StorageStack extends sst.Stack {
  //Public reference to the table
  //This exposes the table publicly- can reference in other stacks
  table;

  //Public refernce to the bucket
  bucket;
  constructor(scope, id, props) {
    super(scope, id, props);

    //Create S3 bucket
    this.bucket = new sst.Bucket(this, "Uploads");

    //Create dynamoDb table
    this.table = new sst.Table(this, "Notes", {
      fields: {
        userId: sst.TableFieldType.STRING,
        noteId: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    });
  }
}
