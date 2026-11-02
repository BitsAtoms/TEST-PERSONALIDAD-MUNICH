const photo = (id) => {
  if (/\.(png|jpe?g|webp)$/i.test(id)) {
    return id.startsWith("Imagenes/") ? id : `Imagenes/${id}`;
  }

  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
};

    // Preguntas y respuestas posibles. Cada tag suma puntos a un estilo.
    const questions = [
      {
        title: "¿Qué plan elegirías?",
        answers: [
          {
            label: "Explorar la ciudad",
            tag: "urban",
            image: "photo-1519608487953-e999c86e7455"
          },
          {
            label: "Salir a entrenar",
            tag: "sport",
            image: "photo-1538805060514-97d9cc17730c"
          },
          {
            label: "Un paseo tranquilo",
            tag: "classic",
            image: "photo-1470770841072-f978cf4d019e"
          },
          {
            label: "Un plan diferente",
            tag: "bold",
            image: "photo-1529139574466-a303027c1d8b"
          }
        ]
      },
      {
        title: "¿Qué look te representa?",
        answers: [
          {
            label: "Streetwear",
            tag: "urban",
            image: "photo-1523398002811-999ca8dec234"
          },
          {
            label: "Deportivo",
            tag: "sport",
            image: "photo-1534438327276-14e5300c3a48"
          },
          {
            label: "Minimalista",
            tag: "classic",
            image: "photo-1490481651871-ab68de25d43d"
          },
          {
            label: "Atrevido",
            tag: "bold",
            image: "photo-1539109136881-3be0616acf4b"
          }
        ]
      },
      {
        title: "¿Qué es lo más importante?",
        answers: [
          {
            label: "Estilo urbano",
            tag: "urban",
            image: "photo-1528701800489-20be3c4ea2c8"
          },
          {
            label: "Sensación deportiva",
            tag: "sport",
            image: "photo-1542291026-7eec264c27ff"
          },
          {
            label: "Versatilidad",
            tag: "classic",
            image: "photo-1549298916-b41d501d3772"
          },
          {
            label: "Diseño original",
            tag: "bold",
            image: "photo-1552346154-21d32810aba3"
          }
        ]
      },
      {
        title: "Elige tu universo visual",
        answers: [
          {
            label: "Asfalto y ciudad",
            tag: "urban",
            image: "photo-1519501025264-65ba15a82390"
          },
          {
            label: "Movimiento y energía",
            tag: "sport",
            image: "photo-1461896836934-ffe607ba8211"
          },
          {
            label: "Colores neutros",
            tag: "classic",
            image: "zapatos_clasic.jpg"
          },
          {
            label: "Color y personalidad",
            tag: "bold",
            image: "zapatos_leopardo.jpg"
          }
        ]
      }
    ];

    // Productos/estilos que pueden recomendarse al terminar el test.
    const products = {
  urban: {
    name: "The Urban",
    description:
      "Tu estilo es urbano, actual y versátil. " +
      "Busca una zapatilla que acompañe tu ritmo por la ciudad.",
    images: [
      "zapatos_comodos.png",
      "zapatos_urban_marron.png",
      "zapatos_urban_plata.png",
      "zapatos_urban.png"
    ]
  },

  sport: {
    name: "The Active",
    description:
      "Te atraen el movimiento y la energía. " +
      "Explora modelos deportivos adecuados para tu actividad.",
    images: [
      "zapatos_deportivas_gris.jpg",
      "zapatos_deportivas_negras.jpg",
      "zapatos_deportivas_verde.jpg",
      "zapatos_deportivas_azules.png"
    ]
  },

  classic: {
    name: "The Essential",
    description:
      "Prefieres un diseño atemporal que combine " +
      "fácilmente con diferentes looks.",
    images: [
      "zapatos_clasic.jpg",
      "zapatos_negras_gris.jpg",
      "zapatos_beige.png",
      "zapatos_rositas.png"
    ]
  },

  bold: {
    name: "The Statement",
    description:
      "Te gusta expresar tu personalidad con diseños " +
      "llamativos y detalles diferentes.",
    images: [
      "zapatos_leopardo.jpg",
      "zapatos_colores.png",
      "zapatos_diferentes.png",
      "zapatos_rojos.png"
    ]
  }
};

    // Estado del test: pregunta actual y puntuación de cada estilo.
    let current = 0;
    let scores = {};

    const $ = (id) => document.getElementById(id);

    // Muestra una pantalla y oculta las otras.
    function show(section) {
      ["welcome", "quiz", "result"].forEach(id => {
        $(id).classList.toggle("hidden", id !== section);
      });
    }
    // Reinicia los puntos y comienza el cuestionario.
    function startQuiz() {
      current = 0;
      scores = {
        urban: 0,
        sport: 0,
        classic: 0,
        bold: 0
      };
      show("quiz");
      renderQuestion();
    }

    // Dibuja la pregunta actual y crea sus botones de respuesta.
    function renderQuestion() {
      const q = questions[current];

      $("counter").textContent =
        `${current + 1} / ${questions.length}`;
      $("stepLabel").textContent =
        `PREGUNTA ${current + 1} DE ${questions.length}`;
      $("question").textContent = q.title;
      $("bar").style.width =
        `${(current / questions.length) * 100}%`;

      const choices = $("choices");
      choices.replaceChildren();

      q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.className = "choice";

        const img = document.createElement("img");
        img.src = photo(answer.image);
        img.alt = answer.label;
        img.loading = "eager";

        const label = document.createElement("span");
        label.textContent = answer.label;

        button.append(img, label);
        button.addEventListener("click", () => {
          scores[answer.tag]++;
          current++;

          if (current < questions.length) {
            renderQuestion();
          } else {
            renderResult();
          }
        });

        choices.append(button);
      });
    }

    // Calcula el estilo ganador y muestra la recomendación final.
    function renderResult() {
      const winner = Object.keys(scores).reduce((a, b) =>
        scores[a] >= scores[b] ? a : b
      );
      const product = products[winner];

      $("counter").textContent = "LO MÁS TU";
      $("bar").style.width = "100%";
      $("resultTitle").textContent = product.name;
      $("resultDescription").textContent = product.description;
      const gallery = $("resultGallery");
      gallery.replaceChildren();

      product.images.forEach(image => {
        const img = document.createElement("img");
        img.src = photo(image);
        img.alt = product.name;
        gallery.append(img);
      });

      show("result");
    }

    // Acciones de los botones de inicio y reinicio.
    $("start").addEventListener("click", startQuiz);
    $("restart").addEventListener("click", () => {
      show("welcome");
      $("counter").textContent = ".";
      $("bar").style.width = "0";
    });
