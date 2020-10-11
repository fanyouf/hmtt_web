async function f () {
  await b()
  a()
  c()
}

function a () {
  console.log('a')
}
async function b () {
  console.log('b')
}

function c () {
  console.log('c')
}

function d () {
  f()
  console.log(1)
}

d()
