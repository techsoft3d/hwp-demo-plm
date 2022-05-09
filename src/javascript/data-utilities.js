import assemblies from "../data/assemblies.json"; 
import users from "../data/users.json";

function getAssembly(projectNumber) {
  let result = null;
  assemblies.forEach(assembly => {
    if (assembly.projectNumber == projectNumber) {
      result = assembly;
    }
  });

  return result;
}

function getUser(userId) {
  let result = null;
  users.forEach(user => {
    if (user.id == userId) {
      result = user;
    }
  });

  return result;
}

export { assemblies, users, getAssembly, getUser };

