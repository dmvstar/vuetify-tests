<!-- Copy and paste the converted output. -->

<!-----



Conversion time: 4.787 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs™ to Markdown version 2.0β2
* Fri May 01 2026 09:35:31 GMT-0700 (czas pacyficzny letni)
* Source doc: Fragmenty połączone w diagramach sekwencji
* Tables are currently converted to HTML tables.
----->



# Fragmenty połączone w diagramach sekwencji

W projektowaniu systemów za pomocą UML (Unified Modeling Language), **Combined Fragments** (fragmenty połączone) pozwalają na dodawanie logiki sterującej do diagramów sekwencji, takiej jak warunki, pętle czy operacje równoległe.

Oto pełna lista kluczowych operatorów interakcji stosowanych w ramkach diagramów sekwencji:


### 1. Struktury decyzyjne i warunkowe



* **alt (Alternatives):** Odpowiednik konstrukcji if-then-else. Zawiera kilka sekcji (oddzielonych linią przerywaną), z których wykonana zostanie **tylko jedna**, w zależności od tego, który warunek (guard) jest prawdziwy.
* **opt (Option):** Odpowiednik prostego if. Zawiera interakcję, która wydarzy się **tylko wtedy**, gdy warunek jest spełniony. Jeśli nie – fragment jest pomijany.
* **break:** Służy do obsługi wyjątków lub przerwania pętli. Jeśli warunek w ramce break zostanie spełniony, reszta głównego diagramu jest ignorowana, a wykonywana jest tylko zawartość tej ramki (podobnie jak return lub exit).


### 2. Pętle



* **loop:** Powtarza daną interakcję określoną liczbę razy lub dopóki warunek jest spełniony. Składnia to zazwyczaj loop(min, max) lub loop(warunek).


### 3. Wykonywanie równoległe i kolejność



* **par (Parallel):** Fragmenty wewnątrz tej ramki wykonują się **równolegle**. Kolejność komunikatów między różnymi sekcjami nie jest określona (może wystąpić przeplot).
* **seq (Weak Sequencing):** Domyślny tryb (często niewidoczny). Komunikaty w obrębie jednej linii życia muszą zachować kolejność, ale komunikaty na różnych liniach mogą się przeplatać, jeśli nie ma między nimi zależności.
* **strict (Strict Sequencing):** Narzuca **ścisłą kolejność** od góry do dołu dla wszystkich komunikatów w ramce, niezależnie od tego, na której linii życia się znajdują.


### 4. Zarządzanie błędami i negacja



* **neg (Negative):** Opisuje interakcje, które są **niedozwolone** lub uznawane za błąd w danym kontekście. Służy do pokazania, co "nie powinno się wydarzyć".
* **assert (Assertion):** Wskazuje, że interakcja wewnątrz ramki jest **jedyną prawidłową** kontynuacją. Jeśli system zachowa się inaczej, oznacza to błąd projektu.


### 5. Inne operatory



* **critical (Critical Region):** Definiuje sekcję krytyczną (atomową). Żadne inne procesy nie mogą "wkraść się" w środek tej sekwencji komunikatów (blokada przerwań).
* **ignore / consider:** * ignore {msg}: Określa komunikaty, które mogą się pojawić, ale nie mają znaczenia dla tego diagramu.
    * consider {msg}: Wskazuje konkretne komunikaty, na których skupia się dany fragment, ignorując resztę.
* **ref (Reference):** To nie jest fragment logiczny, ale odnośnik do **innego diagramu sekwencji**. Pozwala na reużywalność i modularność (tzw. sub-diagramy).


### 

---
Podsumowanie w tabeli


<table>
  <tr>
   <td><strong>Operator</strong>
   </td>
   <td><strong>Logika programistyczna</strong>
   </td>
   <td><strong>Zastosowanie</strong>
   </td>
  </tr>
  <tr>
   <td><strong>alt</strong>
   </td>
   <td>if... else if... else
   </td>
   <td>Wybór jednej z wielu ścieżek.
   </td>
  </tr>
  <tr>
   <td><strong>opt</strong>
   </td>
   <td>if (bez else)
   </td>
   <td>Opcjonalny krok.
   </td>
  </tr>
  <tr>
   <td><strong>loop</strong>
   </td>
   <td>for, while
   </td>
   <td>Powtarzanie czynności.
   </td>
  </tr>
  <tr>
   <td><strong>par</strong>
   </td>
   <td>Wielowątkowość
   </td>
   <td>Czynności dziejące się w tym samym czasie.
   </td>
  </tr>
  <tr>
   <td><strong>ref</strong>
   </td>
   <td>Wywołanie funkcji
   </td>
   <td>Odwołanie do innego diagramu.
   </td>
  </tr>
</table>


Czy chciałbyś, abym narysował przykład użycia któregoś z tych fragmentów (np. alt lub loop) za pomocą kodu tekstowego (Mermaid/PlantUML)?




#### sequenceDiagram


```
    participant U as Użytkownik
    participant S as Serwis Podróży
    participant AL as System Linii Lotniczych
    participant HT as System Hotelowy
    participant EM as Serwis Powiadomień

    U->>S: Potwierdź rezerwację "Lot + Hotel"
    S->>S: Autoryzacja płatności

    rect rgb(240, 240, 240)
    note right of S: Fragment PAR (Operacje równoległe)
    par Rezerwacja Lotu
        S->>AL: Zarezerwuj miejsce w samolocie
        AL-->>S: Potwierdzenie biletu (e-ticket)
    and Rezerwacja Hotelu
        S->>HT: Zarezerwuj pokój (double room)
        HT-->>S: Potwierdzenie rezerwacji pokoju
    end
    end

    critical Generowanie dokumentów podróży
        S->>S: Tworzenie pliku PDF z kompletem dokumentów
    end

    S->>EM: Wyślij e-mail z potwierdzeniem
    EM-->>U: Otrzymanie e-maila
```



#### sequenceDiagram


```
    participant U as Użytkownik
    participant S as System Sklepu
    participant P as Bramka Płatnicza
    U->>S: Wybranie produktów    
    loop Każdy produkt w koszyku
        S->>S: Przelicz sumę i sprawdź dostępność
    end
    S->>U: Wyświetl podsumowanie   
    U->>S: Potwierdzenie zamówienia
    alt Metoda: Karta Kredytowa
        S->>P: Autoryzacja karty
        P-->>S: Sukces (200 OK)
    else Metoda: Przelew
        S->>P: Generowanie linku do przelewu
        P-->>S: Link wygenerowany
    else Metoda: Gotówka
        S->>S: Oznacz jako "Płatność przy odbiorze"
    end
    opt Subskrypcja Newslettera
        S->>U: Wyślij kod rabatowy na e-mail
    end
    S-->>U: Potwierdzenie przyjęcia zamówienia
```





#### @startuml


```
skinparam style strictuml
actor Użytkownik as U
participant "System Sklepu" as S
participant "Bramka Płatnicza" as P

U -> S: Wybranie produktów

loop Każdy produkt w koszyku
    S -> S: Przelicz sumę i sprawdź dostępność
end

S -> U: Wyświetl podsumowanie
U -> S: Potwierdzenie zamówienia

alt Metoda: Karta Kredytowa
    S -> P: Autoryzacja karty
    P --> S: Sukces (200 OK)
else Metoda: Przelew
    S -> P: Generowanie linku do przelewu
    P --> S: Link wygenerowany
else Metoda: Gotówka
    S -> S: Oznacz jako "Płatność przy odbiorze"
end

opt Subskrypcja Newslettera
    S -> U: Wyślij kod rabatowy na e-mail
end

S --> U: Potwierdzenie przyjęcia zamówienia
@endum
```



#### @startuml


```
skinparam style strictuml
actor Użytkownik as U
participant "Serwis Podróży" as S
participant "System Linii Lotniczych" as AL
participant "System Hotelowy" as HT
participant "Serwis Powiadomień" as EM

U -> S: Potwierdź rezerwację "Lot + Hotel"
S -> S: Autoryzacja płatności

par Rezerwacja Lotu
    S -> AL: Zarezerwuj miejsce w samolocie
    AL --> S: Potwierdzenie biletu (e-ticket)
else Rezerwacja Hotelu
    S -> HT: Zarezerwuj pokój (double room)
    HT --> S: Potwierdzenie rezerwacji pokoju
end

critical Generowanie dokumentów podróży
    S -> S: Tworzenie pliku PDF z kompletem dokumentów
end

S -> EM: Wyślij e-mail z potwierdzeniem
EM --> U: Otrzymanie e-maila
@endum
