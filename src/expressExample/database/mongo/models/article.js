const { model, Schema } = require('mongoose')

// price, image, description, name

const ArticleSchema = new Schema(
  {
    id: {
      required: true,
      type: String,
      unique: true
    },
    price: {
      required: true,
      type: String
    },
    image: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    name: {
        required: true,
        type: String
      }
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        delete ret._id
      }
    },
    virtuals: {
      priceName: {
        get() {
          return `${this.price} $${this.name}`
        }
      }
    }
  }
)

const ArticleModel = model('articles', ArticleSchema)

module.exports = ArticleModel
