1. Rutas de Usuario (USER):
Rutas:
Obtener todos los usuarios (solo admin):
GET /users - Controlador: getAllUsers
Correcto. Solo un admin puede ver todos los usuarios.

Obtener un usuario por ID:
GET /users/:id - Controlador: getUserById
Correcto. Permite que un usuario o admin vea el perfil de un usuario específico.

Actualizar un usuario:
PUT /users/:id - Controlador: updateUser
Correcto. Permite que un usuario modifique su propio perfil, o un admin modifique cualquier perfil.

Banear un usuario (solo admin):
PUT /users/ban/:id - Controlador: banUser
Correcto. Solo un admin puede banear a un usuario.

Desbannear un usuario (solo admin):
PUT /users/desban/:id - Controlador: desBanUser
Correcto. Solo un admin puede desbanear a un usuario.

Todo en orden para las rutas de usuario.

2. Rutas de Portafolio (PortFoil):
Rutas:
Ver todos los portafolios (solo admin):
GET /portfoils - Controlador: getAllPortfoils
Correcto. Solo un admin puede ver todos los portafolios.

Ver el portafolio de un usuario por idUser:
GET /portfoils/:id - Controlador: getPortfoilByUserId
Correcto. Permite ver el portafolio de un usuario por ID.

Crear una transacción (compra/venta de instrumentos):
POST /portfoils/:idPortfoil/transaction - Controlador: createTransaction
Correcto. Permite que el usuario realice una compra/venta de instrumentos en su portafolio.

Todo en orden para las rutas de portafolio.

3. Rutas de Operación (Operation):
Rutas:
Obtener todas las operaciones del usuario autenticado:
GET /operations - Controlador: getAllOperations
Correcto. Permite al usuario obtener todas sus operaciones.

Crear una nueva operación (compra/venta de instrumentos):
POST /operations - Controlador: createOperation
Correcto. Permite al usuario realizar una operación de compra o venta.

Obtener una operación específica por su ID:
GET /operations/:id - Controlador: getOperationById
Correcto. Permite obtener una operación específica por ID.

Todo en orden para las rutas de operación.

4. Rutas de Login (LOGIN):
Rutas:
Iniciar sesión:
POST /login - Controlador: login
Correcto. Permite al usuario autenticarse.

Registrar un nuevo usuario:
POST /register - Controlador: register
Correcto. Permite registrar un nuevo usuario.

Todo en orden para las rutas de login.

5. Rutas de Goal (GOAL):
Rutas:
Ver todas las metas (goals):
GET /goals - Controlador: getAllGoals
Correcto. Permite que el usuario vea todas sus metas.

Ver una meta por ID:
GET /goals/:id - Controlador: getGoalById
Correcto. Permite que el usuario vea una meta específica por ID.

Crear una nueva meta:
POST /goals - Controlador: createGoal
Correcto. Permite crear una nueva meta.

Actualizar una meta:
PUT /goals/:id - Controlador: updateGoal
Correcto. Permite actualizar una meta.

Eliminar una meta:
DELETE /goals/:id - Controlador: deleteGoal
Correcto. Permite eliminar una meta.

Todo en orden para las rutas de meta (goal).

6. Rutas de Perfil Financiero (FinancialProfile):
Rutas:
Ver el perfil financiero del usuario autenticado:
GET /financial-profile/profile - Controlador: getFinancialProfile
Correcto. Permite que el usuario vea su propio perfil financiero.

Ver todos los perfiles financieros (solo para admins):
GET /financial-profile/profiles - Controlador: getAllFinancialProfiles
Correcto. Permite al admin ver todos los perfiles financieros.

Modificar el perfil financiero del usuario autenticado:
PUT /financial-profile/profile - Controlador: updateFinancialProfile
Correcto. Permite que el usuario modifique su propio perfil financiero.

Todo en orden para las rutas de perfil financiero.

7. Rutas de Balance (Balance):
Rutas:
Ver el balance del usuario:
GET /balance - Controlador: getBalance
Correcto. Permite que el usuario vea su balance.

Retirar dinero:
POST /balance/withdraw - Controlador: withdraw
Correcto. Permite al usuario retirar dinero de su balance.

Transferir dinero a ahorros (Goals):
POST /balance/transferToSaved - Controlador: transferToSaved
Correcto. Permite transferir dinero a metas de ahorro.

Cancelar una meta y devolver el dinero al balance depositado:
POST /balance/cancelGoal - Controlador: cancelGoal
Correcto. Permite cancelar una meta y devolver el dinero al balance.

Todo en orden para las rutas de balance.

