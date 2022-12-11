interface HttpResponse<DT> {
    statusCode: number;
    data?: DT;
}

export default HttpResponse;
