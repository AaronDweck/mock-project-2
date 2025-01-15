export default function errorHandler(err, req, res, next) {
  // console.log(page)
  console.log('second test')
  console.log(err)
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
    console.log(res.locals.page)
    res.status(422).redirect(res.locals.page) 
    // .send({errors: customError})
    // Other
  } else {
    // ! 422 -> internal server error
    res.status(500).send({ message: "Something went wrong. Please check your request and try again!" })
  }
}