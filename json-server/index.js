const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
    await new Promise((res) => {
        setTimeout(res, 100);
    });
    next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
            // return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Эндпоинт для регистрации
server.post('/registration', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        if (!username && !password) {
            return res.status(400).json({ message: 'Не введен логин или пароль' });
        }

        // проверить, что пользователя в базе нет

        const isUserExisting = users.some((user) => user.username === username)
        if (isUserExisting) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const userToSave = { username, password, data: {} }

        db.users.push(userToSave)
        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json(userToSave);


    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// Эндпоинт для инициализации, если есть токен в хранилище
// почему логин - метод post. По сути код тот же, что и для логина, меняется только эндпоинт
// в логине, наверное, нужно убрать data, кроме логина и пароля. Уже если логин = 200, то посылать этот запрос, чтобы заполнить redux
server.post('/userTodos', (req, res) => {
    try {
        const { username, password } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403).json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// новая группа
//! нужно при создании нового пользователя добавить в db id, чтобы по нему искать нужного пользователя при отправке изменений стейта
//! сейчас поиск просто по логину
server.post('/newGroup', (req, res) => {
    try {
        const { username } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        // const { users = [] } = db;

        const newGroup = { id: crypto.randomUUID(), name: 'new group' }

        db.users.find((user) => {
            return user.username === username
        }).data.groups.push(newGroup)
        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json(newGroup);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// удаление группы
//! не забудь добавить и удаление соотв. туду

server.post('/deleteGroup', (req, res) => {
    try {
        const { username, groupId } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
        // const { users = [] } = db;

        // const groupToDelete = {id: groupId, username}

        // удаление группы
        db.users.find((user) => {
            return user.username === username
        })
            .data.groups.forEach((group, i, arr) => {
                if (group.id === groupId) {
                    arr.splice(i, 1)
                }
            })

        // удаление туду удаленной группы
        const removingTodos = db.users.find((user) => user.username === username).data.todos
        console.log(removingTodos)
        for (let i = removingTodos.length - 1; i >= 0; i--) {
            if (removingTodos[i].group === groupId) {
                removingTodos.splice(i, 1);
            }
        }


        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));


        return res.json(groupId);
        // return res.json(index);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// перемещение группы

server.post('/swapGroups', (req, res) => {
    try {
        const { username, groups } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        db.users.find((user) => {
            return user.username === username
        })
            .data.groups = groups

        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json(db.users.find((user) => {
            return user.username === username
        })
            .data.groups); // тут возвращаю актуальное значение todos. Но операция бессмысленная 

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});
// переименование группы

server.post('/changeGroupName', (req, res) => {
    try {
        const { username, groupId, newName } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));


        const currentGroupName =
            db.users.find((user) => {
                return user.username === username
            })
                .data.groups.find((group) => {
                    return group.id === groupId
                }).name = newName

        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json({ currentGroupName, groupId });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// add todo

server.post('/addTodo', (req, res) => {
    try {
        const { username, groupId } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));


        const newTodo = {
            group: groupId,
            id: crypto.randomUUID(),
            text: '',
            completed: false,
            importance: 'not chosen'
        }

        db.users.find((user) => {
            return user.username === username
        })
            .data.todos.push(newTodo)

        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json(newTodo);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// delete todo

server.post('/deleteTodo', (req, res) => {
    try {
        const { username, todoId } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));



        db.users.find((user) => {
            return user.username === username
        }).data.todos.forEach((todo, i, arr) => {
            if (todo.id === todoId) {
                arr.splice(i, 1)
            }
        })

        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json(todoId);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// update todo

server.post('/updateTodo', (req, res) => {
    try {
        const { username, todoId, newTodo } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));


        db.users.find((user) => {
            return user.username === username
       
        // }).data.todos.find((todo) => todo.id === todoId).completed = newTodo.completed
        //! если так, то работает:
        // db.users.find((user) => {
        //     return user.username === username
       
        // }).data.todos.find((todo) => todo.id === todoId).completed = newTodo.completed
        //!

        // }).data.todos.map((todo) => {
        //     if (todo.id === todoId) {
        //         return newTodo
        //     }
        //     return todo
        // })
        //! так работает
        }).data.todos.forEach((todo, i, arr) => {
            if (todo.id === todoId){
                //! так опять же не работает todo = newTodo
                arr.splice(i, 1, newTodo)
            }
        })
        // }).data.todos.find((todo) => todo.id === todoId) = {}

// 
        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json({newTodo, todoId});
        // return res.json(todo);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});


// swap todos

server.post('/swapTodos', (req, res) => {
    try {
        const { username, todos } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        console.log(todos)
        db.users.find((user) => {
            return user.username === username
        })
            .data.todos = todos
    

        fs.writeFileSync(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4));

        return res.json(todos);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: e.message });
    }
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
