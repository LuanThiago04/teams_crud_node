const db = require ("../models");
const League = db.leagues;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Tá vazio, meu camarada, preenche aí!"
        });
        return;
    }

    const league = {
        name: req.body.name,
        country: req.body.country,
        quantity_teams: req.body.quantity_teams,
        league_value: req.body.league_value,
        is_top5: req.body.is_top5 ? req.body.is_top5: false
    }

    League.create(league)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Algo deu errado na criação da liga."
        });
    });
};


exports.findAll = (req, res) => {
    const name = req.body.name;
    var condition = name ? { name: { [Op.like]: `%${name}%`} } :null;

    League.findAll({where: condition})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Deu b.o na listagem das ligas."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    League.findByPk(id)
      .then(data => {
          if (data) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: `Não foi possível encontrar uma liga com o id=${id}.`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Ocorreu um erro ao tentar encontrar uma liga com o id=" + id
          });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    League.update(req.body, {
        where: {id: id}
    })
      .then(num => {
          if(num == 1 ){
              res.send({
                  message: "Deu bom na atualização da liga."
              });
          } else {
              res.send({
                  message: `Não foi possível atualizar a liga com o id=${id}.`
              });
          } 
      })
      .catch(err => {
          res.status(500).send({
              message: "Algum erro ocorreu ao tentar atualizar a liga com o id=" + id
          });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    League.destroy({
        where: { id: id}
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "A liga foi excluído com sucesso!"
            });
        } else { 
            res.send({
                message: `Não foi possivel excluir a liga com o id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Ocorreu um erro ao tentar apagar a liga com o id= " + id
        });
    });
};

exports.deleteAll = (req, res) => {
    League.destroy({
        where: {},
        truncate: false
    })
     .then(nums => {
         res.send({message: `${nums} ligas foram apagados com sucesso.`});
     })
     .catch(err => {
         res.status(500).send({
             message:
             err.message || "Algum erro ocorreu ao tentar apagar todas as ligas."
         });
     });
};

exports.findAllis_top5 = (req, res) => {
    League.findAllis_top5({ where: { is_top5: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => { 
        res.status(500).send({
            message:
            err.message || "Algum erro ocorreu ao tentar pesquisar todas as ligas do top 5."
        });
    });
};