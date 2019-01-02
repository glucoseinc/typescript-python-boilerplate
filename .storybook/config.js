import {configure, addDecorator} from '@storybook/react'
import React from 'react'
import path from 'path'


function loadStories() {
  const stories = require.context('../src/', true, /__stories__\/.*\.stories\.tsx?$/)
  const fileNames = stories.keys()
  fileNames.sort((a, b) => path.basename(a) > path.basename(b))
  fileNames.forEach((filename) => {
    stories(filename)
  })
}

configure(loadStories, module)

