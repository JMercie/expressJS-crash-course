const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const teamMembers = require("../../members");

// get all members
router.get("/", (req, res) => res.json(teamMembers));

//get single member
router.get("/:id", (req, res) => {
  const found = teamMembers.some(
    member => member.id === parseInt(req.params.id)
  );

  if (found) {
    res.json(
      teamMembers.filter(member => member.id === parseInt(req.params.id))
    );
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

// create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please fill the fields..." });
  }

  teamMembers.push(newMember);

  //res.json(teamMembers);
  res.redirect("/");
});

//update member
router.put("/:id", (req, res) => {
  const found = teamMembers.some(
    member => member.id === parseInt(req.params.id)
  );

  if (found) {
    const upMember = req.body;
    teamMembers.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = upMember.name ? upMember.name : member.name;
        member.email = upMember.email ? upMember.email : member.email;

        res.json({ msg: member + " updated" });
      }
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  const found = teamMembers.some(
    member => member.id === parseInt(req.params.id)
  );

  if (found) {
    res.json({
      msg: "member deleted",
      member: teamMembers.filter(
        member => member.id !== parseInt(req.params.id)
      )
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

module.exports = router;
