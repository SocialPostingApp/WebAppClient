export interface IPost {
    _id: string,
    owner: string,
    title: string,
    review: string,
    image?: string,
    rate?: number,
    likesCount?: number,
    comments?: string[]
}