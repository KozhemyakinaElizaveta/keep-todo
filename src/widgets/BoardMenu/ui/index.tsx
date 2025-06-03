import { useMatch, useNavigate } from 'react-router-dom'
import { Profile, Tasks } from 'shared/iconpack'
import { Box, ButtonsNavigations, Flex } from 'shared/ui'

function BoardMenu() {
  const navigate = useNavigate()
  const isIssues = useMatch('/keep-todo/todo')
  const isProfile = useMatch('/keep-todo/profile')
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'space-between'}
      align={'center'}
      h={'100%'}
      w={'100%'}
      pb={'30px'}
    >
      <Flex h={'100%'} flexDirection={'column'} align={'center'} gap="10px">
        <Box pt={isIssues ? '47px' : 0} pb={isIssues ? '50px' : 0}>
          <ButtonsNavigations
            title="ToDo"
            Icon={<Tasks />}
            check={!!isIssues}
            onClick={() => navigate('/keep-todo/todo')}
          />
        </Box>
      </Flex>
      <Flex flexDirection={'column'} gap={'10px'} align={'center'}>
        <Box pb={isProfile ? '50px' : 0}>
          <ButtonsNavigations
            title="Профиль"
            Icon={<Profile />}
            check={!!isProfile}
            onClick={() => navigate('/keep-todo/profile')}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export { BoardMenu }
