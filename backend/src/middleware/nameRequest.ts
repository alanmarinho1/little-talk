const DebugRequests = (request: any, _response: any, next: () => void) => {
    
    const {method, originalUrl} = request;

    const message = `A requisição ${method} foi feita na roda ${originalUrl}`

    console.log(message);

    next();
}

export default DebugRequests;