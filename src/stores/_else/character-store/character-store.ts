import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { CharacterModel, CharacterSnapshot } from '../character/character'
import { CharacterApi } from '../../services/api/character-api'
import { withEnvironment } from '../_extensions/with-environment'

/**
 * Example store containing Rick and Morty characters
 */
export const CharacterStoreModel = types
  .model('CharacterStore')
  .props({
    characters: types.optional(types.array(CharacterModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveCharacters: (characterSnapshots: CharacterSnapshot[]) => {
      self.characters.replace(characterSnapshots)
    },
  }))
  .actions((self) => ({
    getCharacters: async () => {
      const characterApi = new CharacterApi(self.env.api)
      const result = await characterApi.getCharacters()

      if (result.kind === 'ok') {
        self.saveCharacters(result.characters)
      } else {
        __DEV__ && log(result.kind)
      }
    },
  }))

type CharacterStoreType = Instance<typeof CharacterStoreModel>
export interface CharacterStore extends CharacterStoreType {}
type CharacterStoreSnapshotType = SnapshotOut<typeof CharacterStoreModel>
export interface CharacterStoreSnapshot extends CharacterStoreSnapshotType {}
export const createCharacterStoreDefaultModel = () =>
  types.optional(CharacterStoreModel, {})
