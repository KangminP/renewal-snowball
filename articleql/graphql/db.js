import artdata from "./articles.json"

export const getArticles = () => {
    const articles = artdata.articles
    return articles
}

export const getArticle = id => {
    const articles = artdata.articles
    const article = articles.filter(temparticle => temparticle.id === id)
    return article[0]
}