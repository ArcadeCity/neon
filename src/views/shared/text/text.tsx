import * as React from 'react'
import { Text as ReactNativeText } from 'react-native'
import { presets } from './text.presets'
import { TextProps } from './text.props'
import { translate } from 'i18n'
import { flatten } from 'ramda'
import { capitalize } from 'lib/util'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = 'default',
    capitalize: capitalized = false,
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const whichText = i18nText || text || ''
  const newText = capitalized ? capitalize(whichText) : whichText
  const content = newText || children

  const style = presets[preset] || presets.default
  const styles = flatten([style, styleOverride])

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
