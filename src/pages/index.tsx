import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginLogo } from 'shared/iconpack'
import { ContainerApp, DefaultLayout, Flex, Text } from 'shared/ui'
import { BoardMenu } from 'widgets/BoardMenu/ui'
import { MenuProjects, RightMenu } from 'widgets/index'

const HomePage = lazy(() => import('./home'))
const BoardsPage = lazy(() => import('./boards'))
const ProfilePage = lazy(() => import('./profile'))
const IssuesPage = lazy(() => import('./issues'))

const BASE_URL = '/keep-todo'

export default function Routing() {
  return (
    <DefaultLayout>
      <Flex
        w="100%"
        h="125px"
        flexDirection="column"
        justifyContent="space-around"
      >
        <Flex ml="30px" align={'center'}>
          <LoginLogo />
          <Text fontSize={'32px'} fontWeight={800}>
            Keep ToDo
          </Text>
        </Flex>
        <Flex>
          <MenuProjects />
          <Flex justifySelf={'flex-end'} mr="30px">
            <RightMenu />
          </Flex>
        </Flex>
      </Flex>
      <Flex w="100vw" h="100%">
        <Flex h="100%" w="85px">
          <BoardMenu />
        </Flex>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`${BASE_URL}/lists`} replace />}
          />
          <Route
            path={`${BASE_URL}`}
            element={<Navigate to={`${BASE_URL}/lists`} replace />}
          />

          <Route
            path={`${BASE_URL}/lists`}
            element={
              <ContainerApp>
                <BoardsPage />
              </ContainerApp>
            }
          />
          <Route
            path={`${BASE_URL}/list/:id`}
            element={
              <ContainerApp>
                <HomePage />
              </ContainerApp>
            }
          />
          <Route
            path={`${BASE_URL}/todo`}
            element={
              <ContainerApp>
                <IssuesPage />
              </ContainerApp>
            }
          />
          <Route
            path={`${BASE_URL}/profile`}
            element={
              <ContainerApp>
                <ProfilePage />
              </ContainerApp>
            }
          />
          <Route
            path="*"
            element={
              <Flex
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Text>404 page</Text>
              </Flex>
            }
          />
        </Routes>
      </Flex>
    </DefaultLayout>
  )
}
