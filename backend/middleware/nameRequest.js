module.exports = (request, response, next) => {
    const {method, originalUrl} = request;

    const message = `A requisição ${method} foi feita na roda ${originalUrl}`

    console.log(message);

    next();
}