export default function setTheme(theme) {
  if (theme === 'blue') {
    document.querySelector('body').style.backgroundColor = 'rgb(216, 240, 248)'

    document.querySelector('h1').style.color = 'black'

    document.querySelectorAll('th').forEach(th => {
      th.style.borderColor = 'rgb(52, 101, 134)'
      th.style.backgroundColor = 'rgb(97, 164, 209)'
      th.style.color = 'black'
    })

    document.querySelectorAll('td').forEach(td => {
      td.style.borderColor = 'gray'
      td.style.color = 'black'
    })

    document.querySelectorAll('input').forEach(input => input.style.backgroundColor = 'white')

    document.querySelectorAll('select').forEach(select => select.style.backgroundColor = 'white')

    document.querySelector('.description').style.backgroundColor = 'rgb(164, 218, 236)'
    document.querySelector('.description').style.color = 'black'

    document.querySelectorAll('.inputs-button').forEach(button => {
      button.style.backgroundColor = 'rgb(42, 181, 236)'
      button.style.color = 'white'
    })

    document.querySelector('.reset-alert--inner-container').style.backgroundColor = 'rgb(38, 130, 192)'

    document.querySelector('.reset-alert--inner-container p').style.color = 'white'

    document.querySelectorAll('.reset-alert--buttons-container button').forEach(button => {
      button.style.backgroundColor = 'rgb(19, 78, 97)'
      button.style.color = 'white'
    })

    document.querySelector('.creator-name').style.color = 'orangered'

    document.querySelector('.update-text').style.color = 'rgb(218, 33, 110)'
  }

  // *****************************************************************************************************

  else if (theme === 'pink') {
    document.querySelector('body').style.backgroundColor = 'rgb(255, 175, 228)'

    document.querySelector('h1').style.color = 'rgb(109, 10, 10)'

    document.querySelectorAll('th').forEach(th => {
      th.style.borderColor = 'rgb(175, 18, 110)'
      th.style.backgroundColor = 'rgb(226, 24, 148)'
      th.style.color = 'white'
    })

    document.querySelectorAll('td').forEach(td => {
      td.style.borderColor = 'rgb(177, 87, 154)'
      td.style.color = 'rgb(94, 12, 62)'
    })

    document.querySelectorAll('input').forEach(input => input.style.backgroundColor = 'rgb(255, 210, 236)')

    document.querySelectorAll('select').forEach(select => select.style.backgroundColor = 'rgb(255, 210, 236)')

    document.querySelector('.description').style.backgroundColor = 'rgb(226, 57, 150)'
    document.querySelector('.description').style.color = 'white'

    document.querySelectorAll('.inputs-button').forEach(button => {
      button.style.backgroundColor = 'rgb(240, 24, 132)'
      button.style.color = 'white'
    })

    document.querySelector('.reset-alert--inner-container').style.backgroundColor = 'rgb(226, 18, 122)'

    document.querySelector('.reset-alert--inner-container p').style.color = 'white'

    document.querySelectorAll('.reset-alert--buttons-container button').forEach(button => {
      button.style.backgroundColor = 'rgb(65, 5, 33)'
      button.style.color = 'white'
    })

    document.querySelector('.creator-name').style.color = 'red'

    document.querySelector('.update-text').style.color = 'rgb(71, 3, 7)'
  }
}