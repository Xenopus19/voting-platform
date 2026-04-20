import Option from "./Option";
import User from "./User";
import Vote from "./Vote";

Vote.hasMany(Option, {
  foreignKey: "voteId",
  as: "options",
});

Option.belongsTo(Vote, {
  foreignKey: "voteId",
  as: "vote",
});

User.hasMany(Vote, { foreignKey: "userId", as: "votes" });
Vote.belongsTo(User, { foreignKey: "userId", as: "user" });


export { User };
