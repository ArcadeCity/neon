import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import Welcome from '.';

storiesOf('Welcome', module)
  .addDecorator(withKnobs)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
