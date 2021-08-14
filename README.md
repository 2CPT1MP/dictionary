# Interactive Dictionary App
A dictionary app intended for studying linguistics 

## Dependencies
These things are required to run the app:
- `git`
- `docker`
- `docker-compose`

## Initial setup
Perform the following actions to **run the app**:

1. **Clone** the repository with the following command:
```sh
git clone https://github.com/2CPT1MP/dictionary.git
```
2. Navigate to **project root** directory:
```sh
cd dictionary
```
3. Run this command to **start building** it:
```sh
docker-compose up -d
```
4. **Wait** for it to **build**. **Ignore** the **warnings**.
5. **Wait** for `react-client` to **start up**
6. **Navigate** to [127.0.0.1](http://127.0.0.1)
7. **Sign up** in the app
8. **Sign in**

## Running / stopping the app 
In order to **stop the app** run the following command in project root:
```sh
docker-compose down
```
You can **start** the app over **again** by running this in project root:
```sh
docker-compose up -d
```
