export default function errorHandler(err, req, res, next) {
  console.log(err, err.name)
  // CastError
  if (err.name === 'CastError') {
    // ! 400 -> bad request
    res.status(400).send({ message: "your value doesn't meet the correct requirements." })
    // SyntaxError
  } else if (err.name === 'SyntaxError') {
    // ! 422 -> unprocessible entity
    res.status(422).send({ message: "Invalid JSON in your request body." })
    // ValidationError
  } else if (err.name === 'ValidationError') {
    const customError = {}
    for (const key in err.errors) {
      customError[key] = err.errors[key].message
    }
    console.log(customError)
    // ! 422 -> unprocessible entity
    res.status(422).send({errors: customError})
    // // res.status(422).send({ message: "your request doesn't meet the correct requirements." })
    // Other
  } else {
    // ! 422 -> internal server error
    res.status(500).send({ message: "Something went wrong. Please check your request and try again!" })
  }
}