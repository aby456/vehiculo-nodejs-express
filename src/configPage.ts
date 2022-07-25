import {Pagination} from './models/Pagination';

export const paginationParseParams = (paginationF:any) => {
    console.log(paginationF);
    const limitF = paginationF.limit;
    const pageF = paginationF.page;

    const limit = parseInt(limitF)
    const page = parseInt(pageF)
    
    const paginationParse:Pagination = {
        limit:limit,
        page:page
    }
    return {
        paginationParse
    }
}
