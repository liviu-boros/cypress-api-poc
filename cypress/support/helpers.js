export class steam {

  static verifyURL(itemId, itemLabel) {
    cy.url().should('include', `${itemId}/${itemLabel.replace(/:/g, '').replace(/ /g, '_')}`);
  }

  /**
   * Resolves the cookie acceptance popup by clicking on the "Accept All" button.
   * Assumes that the cookie acceptance popup is present and visible on the page.
   */
  static resolveCookies() {
    cy.get('.popupTextTitle')
      .should('have.length', 2)
      .and('be.visible')
      .parentsUntil('.cookiepreferences_popup')
      .find('.btn_medium')
      .contains('Accept All')
      .should('be.visible')
      .parentsUntil('.cookiepreferences_popup')
      .find('.btn_medium')
      .contains('Reject All')
      .should('be.visible')
      .click()
  }

  /**
   * Checks that the home section with the given header label is present and visible on the page,
   * and that it has the correct number and labels of items.
   *
   * @param {string} headerLabel - The label of the header for the home section.
   * @param {string[]} itemLabels - An array of labels for the items in the home section.
   */
  static checkHomeSection(headerLabel, ...itemLabels) {
    cy.contains(headerLabel)
      .should('be.visible')
      .and('have.css', 'text-transform', 'uppercase')
      .next()
      .children()
      .should('have.length', itemLabels.length)
    itemLabels.forEach((itemLabel) => {
      cy.contains(headerLabel)
        .next()
        .contains(itemLabel)
        .should('be.visible')
    })
  }

  /**
   * Checks that the genre section with the given header label is present and visible on the page,
   * and that it has the correct number and labels of items.
   *
   * @param {string} headerLabel - The label of the header for the genre section.
   * @param {string[]} itemLabels - An array of labels for the items in the genre section.
   */
  static checkGenreSection(headerLabel, ...itemLabels) {
    cy.contains(headerLabel)
      .scrollIntoView({ offset: { top: -300 } })
      .should('be.visible')
      .and('have.css', 'text-transform', 'uppercase')
      .siblings()
      .should('have.length', itemLabels.length)
    itemLabels.forEach((itemLabel) => {
      cy.contains(headerLabel)
        .siblings()
        .contains(itemLabel)
        .should('be.visible')
    })
  }

  /**
   * Verifies that the carousel with the given header label is present and visible on the page,
   * and that it has the correct number of items. Also checks that the items can be clicked and  focused on.
   *
   * @param {string} headerLabel - The label of the header for the carousel.
   * @param {number} carouselTotalItems - The total number of items in the carousel.
   */
  static verifyCarousel(headerLabel, carouselTotalItems) {
    cy.get('div[class=title], h2[class=home_page_content_title]')
      .contains(headerLabel)
      .should('be.visible')
      .parentsUntil('.home_ctn')
      .scrollIntoView({ behavior: 'linear', block: 'center' })
      .find('.carousel_thumbs')
      .should('be.visible')
      .children()
      .should('have.length', carouselTotalItems)
      .each((child) => {
        cy.wrap(child)
          .click()
          .then(() => {
            cy.wrap(child)
              .should('have.class', 'focus')
              .siblings()
              .should('not.have.class', 'focus')
          })
      })
  }

  /**
   * does not work for some reason
   */
  static resolveAgeCheck() {
    cy.get('#ageYear')
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .select('1980')
      .blur()
    cy.get('#ageMonth')
      .should('be.visible')
      .select('February')
      .blur()
    cy.get('#ageDay')
      .should('be.visible')
      .select('12')
      .blur()
    cy.get('.main_content_ctn').click()
    cy.get('#ageYear').should('have.value', '1980')
    cy.wait(2000)
    cy.contains('View Page')
      .should('be.visible')
      .focus()
      .click()
  }

  /**
   * Verify if opening and closing of the search popup is working as expected.
   *
   * @param {string} itemId - The unique identifier of the item
   * @param {string} itemLabel - The label of the item 
   *
   * @examples
   * CypressUtils.verifySearchPopup('item123', 'Item 123');
   */
  static verifySearchPopup(itemId, itemLabel) {
    cy.get('input[placeholder="search"]')
      .scrollIntoView({ offset: { top: -300 } })
      .should('be.visible')
      .type(itemId)
      .then(() => {
        cy.get('#searchterm_options')
          .should('be.visible')
          .should('have.css', 'display', 'block')
          .find('.match_name')
          .should('have.text', itemLabel)
      })
    cy.get('input[placeholder="search"]')
      .clear()
      .then(() => {
        cy.get('#searchterm_options')
          .should('not.be.visible')
          .should('have.css', 'display', 'none')
      })
  }

  /**
   * Searches for an item on the page by its ID and verifies that the correct item popup is displayed.
   *
   * @param {string} itemId - The ID of the item to search for.
   * @param {string} itemLabel - The label of the item to verify is displayed.
   *
   * @example
   * searchItem('1234', 'Infinirealms')
   * searchItem('5678', 'Chrono Legends')
   */
  static searchItem(itemId, itemLabel) {
    cy.get('input[placeholder="search"]')
      .scrollIntoView({ offset: { top: -300 } })
      .should('be.visible')
      .type(itemId)
      .then(() => {
        cy.get('#searchterm_options')
          .should('be.visible')
          .should('have.css', 'display', 'block')
          .find('.match_name')
          .first()
          .should('have.text', itemLabel)
          .click()
      })
  }

  /**
  * Verifies that the child elements of the element with the '#breadcrumb' IDhave the expected text values.
  * Each label in the `labels` array should correspond to an even-indexed childelement, while odd-indexed child elements should have a text value of ">".
  *
  * @param {...string} labels - The expected text values for the child elements.
  *
  * @example
  * verifyBreadcrumbs('label1', 'label2', 'label3')
  * verifyBreadcrumbs('label1')
  * verifyBreadcrumbs('label1', 'label2', 'label3', 'label4')
  */
  static verifyBreadcrumbs(...labels) {
    cy.get('.breadcrumbs')
      .scrollIntoView({ offset: { top: -300 } })
      .find('div')
      .children()
      .should('have.length', labels.length)
      .each((child, index) => {
        cy.wrap(child).should('have.text', labels[index])
      })
  }

  /**
  * Verifies that an title container element with the class '.apphub_HomeHeaderContent' is visible and contains the title element with text 'label'.
  *
  * @example
  * verifyItemTitle('Echo of the Ancients')
  */
  static verifyItemTitle(label) {
    cy.get('.apphub_HomeHeaderContent')
      .should('be.visible')
      .contains(label)
      .should('be.visible')
  }

  /**
  * Verifies the details of an item displayed in the "At a Glance" section.
  *
  * @param {string} headerImage - The URL of the header image for the item.
  * @param {string} shortDescription - The short description of the item.
  * @param {string} releaseDate - The release date of the item.
  * @param {string} developer - The developer of the item.
  * @param {string} publisher - The publisher of the item.
  *
  * @example
  * verifyItemGlanceDetails(
  *   'https://steamcdn-a.akamaihd.net/steam/apps/848450/header.jpg',
  *   'A satirical strategy game that puts you in the role of a machine.',
  *   'Sep 14, 2020',
  *   'Mindox Development Studio',
  *   'Mindox Interactive'
  * )
  */
  static verifyItemGlanceDetails(headerImage, shortDescription, releaseDate, developer, publisher) {
    cy.get('.glance_ctn')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.game_header_image_ctn')
      .find('img')
      .then((img) => {
        cy.get(img)
          .should('be.visible')
          .invoke('attr', 'src')
          .should('contain', headerImage)
        cy.get(img)
      })

      .parents('.glance_ctn')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.game_description_snippet')
      .should('be.visible')
      .should('contain.text', shortDescription)

      .parents('.glance_ctn')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.glance_ctn_responsive_left')
      .contains('Recent Reviews')
      .should('be.visible')
      .and('have.css', 'text-transform', 'uppercase')

      .parents('.glance_ctn')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.glance_ctn_responsive_left')
      .contains('All Reviews')
      .should('be.visible')
      .and('have.css', 'text-transform', 'uppercase')

      .parents('.glance_ctn')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.glance_ctn_responsive_left')
      .contains('Release Date')
      .should('be.visible')
      .and('have.css', 'text-transform', 'uppercase')
      .next()
      .should('contain', releaseDate)
      .and('be.visible')

      .parents('.glance_ctn')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.glance_ctn_responsive_left')
      .contains('Developer')
      .should('be.visible')
      .and('have.css', 'text-transform', 'uppercase')
      .next()
      .contains('a', developer)
      .should('be.visible')

      .parents('.glance_ctn')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.glance_ctn_responsive_left')
      .contains('Publisher')
      .should('be.visible')
      .and('have.css', 'text-transform', 'uppercase')
      .next()
      .contains('a', publisher)
      .should('be.visible')
  }

  /**
   * Verifies that the specified tags are displayed for an item.
   *
   * @param {...string} tags - The tags to be verified.
   * 
   * @example
   * verifyItemTags('tag1', 'tag2', 'tag3')
   * verifyItemTags('tag1', 'tag2', 'tag3', 'tag4', 'tag5')
   */
  static verifyItemTags(...tags) {
    cy.get('.glance_ctn')
      .contains('Popular user-defined tags for this product:')
      .scrollIntoView({ offset: { top: -300 } })
      .next()
      .children(`:nth-child(-n+${tags.length})`)
      .should('have.length', tags.length)
      .each((child, index) => {
        cy.wrap(child)
          .contains('a', tags[index])
          .should('be.visible')
      })
  }

  /**
   * Verifies the price of an item on the page.
   *
   * @param {string} itemName - The name of the item.
   * @param {string} originalPrice - The original price of the item.
   * @param {string} discount - The discount applied to the item.
   * @param {string} finalPrice - The final price of the item after the discount is applied.
   *
   * @example
   * verifyItemPrice('Nebula King', '10,00€', '-50%', '5,00€')
   * verifyItemPrice('Frontier Tides', '', '-0%', '$19,99€')
   */
  static verifyItemPrice(itemName, originalPrice, discout, finalPrice) {
    cy.contains('h1', `Buy ${itemName}`)
      .scrollIntoView({ offset: { top: -300 } })
      .should('be.visible')
      .then((el) => {
        if (discout === '-0%') {
          cy.wrap(el)
            .siblings()
            .contains('.game_purchase_price', finalPrice)
            .should('be.visible')
        } else {
          cy.wrap(el)
            .siblings()
            .contains('.discount_pct', discout)
            .should('be.visible')
            .siblings()
            .contains('.discount_original_price', originalPrice)
            .should('be.visible')
            .siblings()
            .contains('.discount_final_price', finalPrice)
            .should('be.visible')
        }
      })
  }

  /**
   * Adds an item to the cart.
   *
   * @param {string} itemName - The name of the item to be added to the cart.
   *
   * @example
   * addItemToCart('The Ancients')
   * addItemToCart('Throne Chronicles')
   */
  static addItemToCart(itemName) {
    cy.contains('h1', `Buy ${itemName}`)
      .scrollIntoView({ offset: { top: -300 } })
      .should('be.visible')
      .siblings()
      .contains('a')
      .focus()
      .click()
  }

  /**
   * Verifies the system requirements for an item.
   *
   * @param {string} requirementType - The type of system requirement ('Minimum', 'Recommended').
   * @param {...string} items - The system requirements to be verified.
   *
   * @example
   * verifyRequirements('Minimum', 'OS: Windows 7', 'Processor: Intel Core i5-4690K', 'Memory: 8 GB RAM')
   */
  static verifyRequirements(requirementType, ...items) {
    cy.contains('h2', 'System Requirements')
      .scrollIntoView({ offset: { top: -300 } })
      .should('be.visible')
      .siblings()
      .contains(requirementType)
      .siblings('ul')
      .children()
      .then(() => {
        items.forEach((item) => {
          cy.contains(item)
            .should('be.visible')
        })
      })
  }

  /**
  * Verifies that the cart total displayed on the page is correct.
  *
  * @param {string} totalPrice - The expected total price of the items in the cart.
  * 
  * @example
  * verifyCartTotal('30,00€')
  * verifyCartTotal('29,99€')
  */
  static verifyCartTotal(totalPrice) {
    cy.contains('Estimated total')
      .parents('.estimated_total_box')
      .scrollIntoView({ offset: { top: -300 } })
      .find('.price')
      .should('contain.text', totalPrice)
    // .should('be.visible')
  }

}

export class utils {

  static convertRequirementsToObject(string) {
    let requirements = string.split('<br>')
    requirements = requirements.filter(key => key.startsWith('</'))
    const requirementsObj = {}
    for (const requirement of requirements) {
      const clearnRequirement = requirement.replace(/<[^>]*>/g, '')
      const [key, value] = clearnRequirement.split(':')
      const cleanKey = key.trim()
      const cleanValue = value.trim()
      requirementsObj[cleanKey] = cleanValue
    }
    return requirementsObj
  }

  static sumPricesUS(obj) {
    return '$' + Object.values(obj).reduce((acc, curr) => {
      return acc + parseFloat(curr.price_overview.final_formatted.slice(1))
    }, 0)
      .toFixed(2)
  }

  static sumPrices(obj) {
    return Object.values(obj).reduce((acc, curr) => {
      return acc + parseFloat(curr.price_overview.final_formatted.replace(',', '.'))
    }, 0)
      .toFixed(2).replace('.', ',') + '€' // Convert the sum to a fixed-point string with 2 decimal places
  }

  static convertResponseToCleanObject(response, itemObj, itemID) {
    itemObj[itemID] = response['body'][itemID]['data']
    itemObj[itemID]['pc_requirements']['minimum'] = utils.convertRequirementsToObject(itemObj[itemID]['pc_requirements']['minimum'])
    itemObj[itemID]['pc_requirements']['recommended'] = utils.convertRequirementsToObject(itemObj[itemID]['pc_requirements']['recommended'])
    itemObj[itemID]['header_image'] = itemObj[itemID]['header_image']
      .substring(
        itemObj[itemID]['header_image'].indexOf('/steam'),
        itemObj[itemID]['header_image'].length
      )
    // .replace("akamai", "cloudflare")
    itemObj[itemID]['recommendations']['total'] = String(itemObj[itemID]['recommendations']['total']).replace(/(\d)(?=(\d{3})+$)/g, "$1,")
    return itemObj
  }

}