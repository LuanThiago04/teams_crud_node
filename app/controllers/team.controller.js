const db = require ("../models");
const Team = db.teams;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Tá vazio, meu camarada, preenche aí!"
        });
        return;
    }

    const team = {
        name: req.body.name,
        country: req.body.country,
        stadium: req.body.stadium,
        stadium_capacity: req.body.stadium_capacity,
        quantity_trophies: req.body.quantity_trophies,
        cast_value: req.body.cast_value,
        international_champion: req.body.international_champion ? req.body.international_champion: false
    }

    Team.create(item)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Algo deu errado na criação do item."
        });
    });
};


exports.findAll = (req, res) => {
    const name = req.body.name;
    var condition = name ? { name: { [Op.like]: `%${name}%`} } :null;

    Team.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Deu b.o na listagem dos item."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Team.findByPk(id)
      .then(data => {
          if (data) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: `Não foi possível encontrar um item com o id=${id}.`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Ocorreu um erro ao tentar encontrar um item com o id=" + id
          });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Team.update(req.body, {
        where: {id: id}
    })
      .then(num => {
          if(num == 1 ){
              res.send({
                  message: "Deu bom na atualização do item."
              });
          } else {
              res.send({
                  message: `Não foi possível atualizar o item com o id=${id}.`
              });
          } 
      })
      .catch(err => {
          res.status(500).send({
              message: "Algum erro ocorreu ao tentar atualizar o item com o id=" + id
          });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Team.destroy({
        where: { id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "O item foi excluído com sucesso!"
            });
        } else { 
            res.send({
                message: `Não foi possivel excluir o item com o id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar apagar o item com o id= " + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Team.destroy({
        where: {},
        truncate: false
    })
     .then(nums => {
         res.send({message: `${nums} Itens foram apagados com sucesso.`});
     })
     .catch(err => {
         res.status(500).send({
             message:
             err.message || "Algum erro ocorreu ao tentar apagar todos os itens."
         });
     });
};

exports.findAllinternational_champion = (req, res) => {
    Item.findAllinternational_champion({ where: { international_champion: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => { 
        res.status(500).send({
            message:
            err.message || "Algum erro ocorreu ao tentar pesquisar todos os itens inflamáveis."
        });
    });
};