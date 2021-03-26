import { getArticles, getArticle } from "./db"

const resolvers = {
    Query: {
        articles: () => getArticles(),
        article: (_, {id}) => getArticle(id),
    }
}

export default resolvers