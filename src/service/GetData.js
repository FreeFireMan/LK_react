class GetData{
    baseUrl = 'http://localhost:8080/api';

    getCatalog=(endPoint)=> fetch(`${this.baseUrl}/catalog`).then(res => res.json()) ;
    getFirtsPageOfProduct=(filterFlag,pageSize,currentPage,myJson = {})=>
        fetch(`${this.baseUrl}/categories/${filterFlag}
        /products?page=${currentPage}&size=${pageSize}`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(myJson),
            }).then(res => res.json()) ;
    getFilter=(id)=> fetch(`${this.baseUrl}/filter/${id}`).then(res => res.json()) ;

}
export default new GetData();