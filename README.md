# @playfulcorgi/parse-post

Parses strings with [gray matter][1] in the following format:

```md
---
title: some title here
date: 2017-10-12
permalink: some-permalink-here
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in rebus apertissimis nimium longi sumus. Nos paucis ad haec additis finem faciamus aliquando;<!-- more -->Uterque enim summo bono fruitur, id est voluptate. Fortitudinis quaedam praecepta sunt ac paene leges, quae effeminari virum vetant in dolore. Duo Reges: constructio interrete. Idemque diviserunt naturam hominis in animum et corpus.
```

All fields inside gray matter are optional and will be `null` in the output if not used. Gray matter is optional too.

If `<!-- more -->` exists within the text after gray matter, text before it will be treated as the excerpt, as long as it's not empty, and the whole text (including text before `<!-- more -->`) as the full contect. If `excerpt` is provided in the gray matter and not empty, it will be treated as the excerpt **only when** there's no `<!-- more -->`.

`date` field inside gray matter can have multiple formats. It mainly supports the [MySQL DATE and DATETIME][2] format.

Example output (used above string as input):
```js
{
  title: 'some title here',
  permalink: 'some-permalink-here',
  date: 1507766400000,
  excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in rebus apertissimis nimium longi sumus. Nos paucis ad haec additis finem faciamus aliquando;',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in rebus apertissimis nimium longi sumus. Nos paucis ad haec additis finem faciamus aliquando;<!-- more -->Uterque enim summo bono fruitur, id est voluptate. Fortitudinis quaedam praecepta sunt ac paene leges, quae effeminari virum vetant in dolore. Duo Reges: constructio interrete. Idemque diviserunt naturam hominis in animum et corpus.'
}
```

[1]: https://github.com/jonschlinkert/gray-matter
[2]: https://dev.mysql.com/doc/refman/5.7/en/date-and-time-type-overview.html

<!-- References:
https://jekyllrb.com/docs/posts/
https://github.com/jonschlinkert/gray-matter
http://nodeca.github.io/js-yaml/ -->