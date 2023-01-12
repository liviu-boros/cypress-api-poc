import { steam, utils } from "../support/helpers"

const baseURL = 'https://store.steampowered.com/'
const items = ['1455840', '427520', '648800', '609320']

for (const itemID of items) {
  describe.only(`Check item with ID: ${itemID}`, () => {

    let itemObj = {}

    before('Visit page', () => {
      cy.clearAllCookies()
      cy.visit(baseURL)
      // steam.resolveCookies()
    })

    it('Get API data and visit page', () => {
      cy.request({
        method: 'GET',
        url: `${baseURL}/api/appdetails?appids=${itemID}&cc=us`,
      })
        .then((response) => {
          itemObj = utils.convertResponseToCleanObject(response, itemObj, itemID)
        })
    })

    it(`Item ${itemID} is showing the correct details`, () => {
      cy.get(itemObj[itemID]).its(0)
        .then((item) => {
          steam.searchItem(item.steam_appid, item.name)
          steam.verifyURL(item.steam_appid, item.name)
          steam.verifyItemTitle(item.name)
          steam.verifyItemGlanceDetails(
            item.header_image,
            item.short_description,
            item.release_date.date,
            item.developers[0],
            item.publishers[0]
          )
          steam.verifyItemPrice(
            item.name,
            item.price_overview.initial_formatted,
            `-${item.price_overview.discount_percent}%`,
            item.price_overview.final_formatted
          )
          steam.verifyRequirements('Minimum', ...Object.values(item['pc_requirements']['minimum']))
          steam.verifyRequirements('Recommended', ...Object.values(item['pc_requirements']['recommended']))
        })
    })

  })
}