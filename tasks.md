**Marcacao de texto**

-   [ ] Mapiar todas as tags p do HTML atribuindo id incremental (#p1, #p2, #p3...)

    const pTags = document.querySelector('p');

    for (const index in pTgas) {
    pTags[parseInt(index)].setAttribute('id', index);
    }

-   [ ] Selecionar texto marcado (padrao do HTML)

        for (const index ...

            pTgas[parseInt(index)].addEventListener('select', event());

*   [ ] Marcar texto selecionado

    function selectText(event) {
    const p = document.querySelector(this.id);

          const start = event.target.selectionStart;
          const end = event.target.selectionEnd;
          const value = event.target.value;

          const selection = value.subtring(start, end);

          // Persiste os dados

    }
