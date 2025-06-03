import { Flex, Button, Input } from 'shared/ui';
import { Plus } from 'shared/iconpack';
import {
  chakra,
  FormControl,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { selectAllLists, selectCurrentList, selectCurrentTask } from 'entities/project/model/selectors';
import { addTask, updateTask } from 'entities/project/model/slice';

type FormValues = {
  title: string;
  description: string;
  priority: 'medium' | 'low' | 'high'; 
  listId: number | null; 
};

export const CreateTaskModal = (
  { 
    type,
    onClose,
    isOpen,
    list 
  }: 
  { 
    type: 'create' | 'edit',
    isOpen: UseDisclosureReturn['isOpen']
    onClose: UseDisclosureReturn['onClose']
    list?: { id: number, title: string } 
  }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currentList = useSelector(selectCurrentList);
  const allLists = useSelector(selectAllLists);
  const currentTask = useSelector(selectCurrentTask); 
  const isIssues = useMatch('/issues')

const [formValues, setFormValues] = useState<FormValues>({
  title: '',
  description: '',
  priority: 'medium',
  listId: currentList?.id || null,
});

  useEffect(() => {
    if (type === 'edit' && currentTask) {
      setFormValues({
        title: currentTask.title,
        description: currentTask.description || '',
        priority: currentTask.priority || 'medium',
        listId: currentList?.id || null,
      });
    }
  }, [type, currentTask, currentList]);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    };

  const handlePriorityChange = (priority: "low" | "medium" | "high") => {
    setFormValues((prev) => ({ ...prev, priority }));
  };

  const handleListChange = (listId: number) => {
    setFormValues((prev) => ({ ...prev, listId }));
  };

  const handleSubmit = () => {
    if (!formValues.title.trim()) {
      alert('Введите название задачи');
      return;
    }
    if (!formValues.listId) {
      console.error('Список не выбран');
      return;
    }

    if (type === 'create') {
      dispatch(
        addTask({
          listId: formValues.listId,
          task: {
            title: formValues.title,
            description: formValues.description,
            priority: formValues.priority,
          },
        })
      );
    } else if (type === 'edit' && currentTask) {
      dispatch(
        updateTask({
          listId: formValues.listId,
          taskId: currentTask.id,
          updates: {
            title: formValues.title,
            description: formValues.description,
            priority: formValues.priority,
          },
        })
      );
    }

    setFormValues({
      title: '',
      description: '',
      priority: 'medium',
      listId: currentList?.id || allLists[0]?.id || 1,
    });
    onClose();
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />
        <ModalContent w={'800px'}>
          <ModalHeader>{type === 'create' ? 'Создание задачи' : 'Редактирование задачи'}</ModalHeader>
          <chakra.form w={'100%'}>
            <ModalBody>
              <Flex flexDir={'column'} gap={'15px'}>
                <FormControl isRequired>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Задача"
                    onChange={handleInputChange('title')}
                    value={formValues.title}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Описание"
                    onChange={handleInputChange('description')}
                    value={formValues.description}
                  />
                </FormControl>
                <FormControl>
                  <Menu>
                    <MenuButton
                      as={Button}
                      h={'32px'}
                      w={'250px'}
                      fontWeight={500}
                      fontSize="12px"
                      color={'blue.300'}
                      borderRadius="8px"
                      background={'white'}
                      border={'1px dashed #B1B6C5'}
                      leftIcon={<Plus strokeColor={'#6D9AF2'} />}
                      _hover={{
                        borderColor: 'blue.300',
                        color: 'blue.600',
                      }}
                    >
                      {formValues.priority
                        ? formValues.priority === 'low' ? 'Низкий' 
                          : formValues.priority === 'medium' ? 'Средний' 
                          : 'Высокий'
                        : 'Выберите приоритет'}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handlePriorityChange('low')}>Низкий</MenuItem>
                      <MenuItem onClick={() => handlePriorityChange('medium')}>Средний</MenuItem>
                      <MenuItem onClick={() => handlePriorityChange('high')}>Высокий</MenuItem>
                    </MenuList>
                  </Menu>
                </FormControl>
                <FormControl>
                  <Menu>
                    <MenuButton
                      as={Button}
                      h={'32px'}
                      w={'250px'}
                      fontWeight={500}
                      fontSize="12px"
                      color={'blue.300'}
                      borderRadius="8px"
                      background={'white'}
                      border={'1px dashed #B1B6C5'}
                      leftIcon={<Plus strokeColor={'#6D9AF2'} />}
                      _hover={{
                        borderColor: 'blue.300',
                        color: 'blue.600',
                      }}
                    >
                      {allLists.find((l) => l.id === formValues.listId)?.title || 'Выберите список'}
                    </MenuButton>
                    <MenuList>
                      {allLists.map((list) => (
                        <MenuItem 
                          key={list.id} 
                          onClick={() => handleListChange(list.id)}
                        >
                          {list.title}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Flex align={'center'} justifyContent={'space-between'} w={'100%'}>
                {type === 'edit' && isIssues && list &&
                  <Button
                    isDisabled={!formValues.title.trim()}
                    type="button"
                    onClick={() => {
                      navigate(`/keep-todo/board/${list.id}`)
                    }}
                    w={'200px'}
                  >
                    Перейти к списку
                  </Button>
                }
                <Flex align={'center'} gap={'20px'} w={'100%'} justifyContent={'flex-end'}>
                  <Button onClick={onClose} variant="transparent">
                    Отмена
                  </Button>
                  <Button
                    isDisabled={!formValues.title.trim()}
                    type="button"
                    onClick={handleSubmit}
                  >
                    {type === 'create' ? 'Создать' : 'Сохранить'}
                  </Button>
                </Flex>
              </Flex>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>
    </>
  );
};