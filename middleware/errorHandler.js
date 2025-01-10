export default function errorHandler(err, req, res, next) {
    console.log(err, err.name)
    if (err.name === 'CastError') {
      // ! 400 -> bad request
      res.status(400).send({ message: "your value doesn't meet the correct requirements." })
    } else if (err.name === 'SyntaxError') {
      // ! 422 -> unprocessible entity
      res.status(422).send({ message: "Invalid JSON in your request body." })
    } else if (err.name === 'ValidationError') {
      res.status(422).send({ message: "your request doesn't meet the correct requirements." })
    } else {
      // ! 422 -> internal server error
      res.status(500).send({ message: "Something went wrong. Please check your request and try again!" })
    }
  }