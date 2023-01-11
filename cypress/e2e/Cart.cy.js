import { steam, utils } from "../support/helpers"

const baseURL = 'https://store.steampowered.com/'
const items = ['1455840', '427520', '648800', '609320']

describe(`Items are added to cart correctly`, () => {

  let itemObj = {}

  before('Visit page', () => {
    cy.clearAllCookies()
    cy.visit(baseURL)
    // steam.resolveCookies()
  })

  for (const itemID of items) {
    it(`Get API data for ${itemID}`, () => {
      cy.request({
        method: 'GET',
        url: `${baseURL}/api/appdetails?appids=${itemID}&cc=ro`,
      })
        .then((response) => {
          itemObj = utils.convertResponseToCleanObject(response, itemObj, itemID)
        })
    })
  }

  it('Add items and verify total price', () => {
    for (const itemID of items) {
      cy.get(itemObj[itemID]).its(0)
        .then((item) => {
          steam.searchItem(item.steam_appid, item.name)
          steam.verifyURL(item.steam_appid, item.name)
          steam.addItemToCart(item.name)
          steam.verifyURL('cart', '')
        })
    }
    cy.get(itemObj).its(0)
      .then((item) => {
        steam.verifyCartTotal(utils.sumPrices(item))
      })
  })

})
