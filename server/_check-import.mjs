import en from './generated/en/sets.json'
console.log('import count', en.length)
console.log('has me05', en.some((s) => s.id === 'me05'))
console.log('me sets', en.filter((s) => String(s.id).startsWith('me')).map((s) => s.id + ' ' + s.name).join(' | '))
