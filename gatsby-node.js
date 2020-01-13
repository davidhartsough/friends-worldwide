const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "messages") {
    const parentNode = getNode(node.parent)
    createNodeField({
      node,
      name: `channel`,
      value: parentNode.relativeDirectory,
    })
  }
}

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const channels = [
    "general",
    "bittercreek-babes",
    "boise",
    "travel",
    "music",
    "memes",
    "tsheets",
    "mech",
    "cats-worldwide",
    "van-life",
    "space",
    "quizzes",
    "codevember",
    "bikinibodies2019",
    "big-plans-big-people",
    "ssshhhree",
    "fire",
    "beerbuddies",
    "mathruinslives",
    "crm",
    "gourmando69",
    "treefort",
    "psychology",
    "ted-talks",
    "interesting-words",
    "top_secret_secrets",
    "plotting",
    "elder-scrolls",
    "business",
    "dreams",
    "natural-inspiration",
    "givethanks",
    "hiking-backpacking",
    "avengers-end-game",
    "design",
    "workwork",
    "ihatehoas",
    "house-hunting",
    "videos",
    "controversy",
    "the-club",
    "wizards-unite",
    "but-what-does-it-mean",
    "hmm-that-looks-wrong",
    "o_canada",
    "kpop",
    "user-suggestions",
    "all-hail-the-glow-cloud",
    "amazing-amazon-ad-photos",
    "introductions",
    "salt-lake-city",
    "quotes",
    "cute-animals-and-baby-yoda",
  ]
  channels.forEach(channel => {
    createPage({
      path: channel,
      component: path.resolve(`./src/templates/channel.js`),
      context: {
        channel: channel,
      },
    })
  })
}
