This is a .net core project where I have created a CRUD operations. This has SQLLite backend.

Command:
  To build the code:
    dotnet build
  To run the project:
    dotnet run
  To run the test project:
    dotnet test
    
Swagger:
http://localhost:5007/swagger/index.html

Get:
http://localhost:5007/api/Product
PUT:
http://localhost:5007/api/Product/2


React.js
STEP 1 — Install Node.js
To verify installation:
  node -v
  npm -v
If both show versions, you're good.

STEP 2 — Create a React Project (Vite — modern & fast)
Vite is the new standard instead of CRA.
Run:
npm create vite@latest product-ui --template react

cd product-ui
npm install
npm run dev

You will see something like:
  Local: http://localhost:5173/

Open that in your browser — React is running 🎉
